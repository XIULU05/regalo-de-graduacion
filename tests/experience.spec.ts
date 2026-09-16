import { test, expect, type Page } from '@playwright/test';

const chapters = ['classified', 'journey', 'worlds', 'mail', 'transformation', 'flight', 'final'];
const sizes = [{width:393,height:852}, {width:390,height:844}, {width:375,height:667}, {width:1440,height:900}];

async function unlock(page: Page, ritual = true) {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.opening-ritual')).toBeVisible();
  await expect(page.locator('.recipient-name')).toHaveText('Para mi Emperatriz, la mujer más trabajadora que conozco.');
  await expect(page.locator('#journey')).toHaveCount(0);
  if (ritual) {
    for (let i = 1; i <= 3; i++) await page.getByRole('button', {name:`Unir pieza ${i}`}).click();
  } else {
    await page.getByRole('button', {name:'Entrar directamente'}).focus();
    await expect(page.getByRole('button', {name:'Entrar directamente'})).toBeFocused();
    await page.keyboard.press('Enter');
  }
  await expect(page.locator('.opening-ritual')).toHaveCount(0);
  await expect(page.locator('#journey')).toHaveCount(0);
  await page.getByRole('button', {name:'Abrir expediente',exact:true}).click();
  await expect(page.locator('#journey')).toBeVisible();
  await expect(page).toHaveURL(/#journey$/);
  await page.waitForTimeout(800);
}

for (const size of sizes) test(`complete experience ${size.width}x${size.height}`, async ({page}, testInfo) => {
  await page.setViewportSize(size);
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', e => {if (e.type() === 'error') errors.push(e.text());});
  page.on('response', r => {if(r.status() >= 400) errors.push(`${r.status()} ${r.url()}`);});
  const prefix = `.verification/remaster-${testInfo.project.name === 'webkit' ? 'webkit-' : ''}${size.width}`;
  await page.goto('/');
  await expect(page.locator('.opening-ritual')).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path:`${prefix}-intro.png`});
  await unlock(page);
  for (const chapter of chapters) {
    const section = page.locator(`#${chapter}`);
    await section.evaluate(el => window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top,behavior:'instant'}));
    await section.locator('img').evaluateAll(async images => {await Promise.all(images.map(i => (i as HTMLImageElement).decode()));});
    await page.waitForTimeout(1000);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${chapter} horizontal overflow`).toBe(true);
    await expect(section.locator('.photo-missing')).toHaveCount(0);
    await page.screenshot({path:`${prefix}-${chapter}.png`});
    const height = await section.evaluate(el => el.getBoundingClientRect().height);
    if (height > size.height + 50) {
      await section.evaluate(el => window.scrollTo({top:window.scrollY+el.getBoundingClientRect().bottom-innerHeight,behavior:'instant'}));
      await page.waitForTimeout(1000);
      await page.screenshot({path:`${prefix}-${chapter}-end.png`});
    }
  }
  const loaded = await page.locator('main img').evaluateAll(images => images.map(i=>({src:(i as HTMLImageElement).getAttribute('src'), loaded:(i as HTMLImageElement).naturalWidth > 0})));
  expect(loaded).toHaveLength(20);
  expect(loaded.every(i=>i.loaded)).toBe(true);
  expect(loaded.some(i=>i.src?.endsWith('scene6-memory00.png'))).toBe(true);
  expect(loaded.some(i=>i.src?.endsWith('scene7-main..png'))).toBe(true);
  expect(loaded.some(i=>i.src?.endsWith('scene4-letter01.jpg'))).toBe(true);
  await expect(page.locator('.fragments,.flight-silhouette,.runway')).toHaveCount(0);
  await expect(page.locator('html')).toHaveAttribute('lang','es');
  for(let i=1;i<=3;i++) {
    const envelope = page.getByRole('button',{name:`Abrir sobre ${i}`});
    await envelope.click();
    await expect(page.locator('.envelope-dialog')).toBeVisible();
    await expect(page.locator('.envelope-dialog')).toHaveCSS('opacity','1');
    await page.waitForTimeout(700);
    if(i === 1) await page.screenshot({path:`${prefix}-envelope.png`});
    await page.getByRole('button',{name:'Cerrar sobre'}).click();
    await expect(page.locator('.envelope-dialog')).not.toBeVisible();
    await expect(envelope).toBeFocused();
  }
  const message = page.getByRole('button',{name:'Abre mi mensaje'});
  await message.click();
  await expect(page.locator('.letter-space')).toBeVisible();
  await expect(page.locator('.letter-space')).toHaveCSS('opacity','1');
  await page.waitForTimeout(1000);
  await page.screenshot({path:`${prefix}-letter.png`});
  await page.getByText('Te amo. Siempre. ♡',{exact:true}).scrollIntoViewIfNeeded();
  await page.locator('.letter-space').evaluate(el => el.scrollTo({top:el.scrollHeight,behavior:'instant'}));
  await expect(page.getByText('Te amo. Siempre. ♡',{exact:true})).toBeInViewport({ratio:1});
  await page.screenshot({path:`${prefix}-letter-end.png`});
  await page.keyboard.press('Escape');
  await expect(page.locator('.letter-space')).not.toBeVisible();
  await expect(message).toBeFocused();
  await page.locator('.replay').click();
  await expect(page).toHaveURL(/#classified$/);
  await page.waitForTimeout(1000);
  await page.getByRole('button',{name:'Volver al camino'}).click();
  await expect(page).toHaveURL(/#journey$/);
  await page.setViewportSize({width:size.height,height:size.width});
  await page.waitForTimeout(700);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.setViewportSize(size);
  expect(errors).toEqual([]);
});

test('soundtrack respects narrative triggers, pause and blocked playback', async ({page}) => {
  // Deterministic media policy simulation: browsers/CI differ in audio output support.
  // Real MP3 availability and playback are checked separately on local Chrome.
  await page.addInitScript(() => {
    const playing = new WeakSet<HTMLMediaElement>();
    let denyOnce = true;
    Object.defineProperty(window, 'AudioContext', {value: undefined});
    Object.defineProperty(HTMLMediaElement.prototype, 'paused', {get: function (this: HTMLMediaElement) { return !playing.has(this); }});
    HTMLMediaElement.prototype.play = function () {
      if (denyOnce) { denyOnce = false; return Promise.reject(new DOMException('Gesture required', 'NotAllowedError')); }
      playing.add(this); this.dispatchEvent(new Event('playing')); return Promise.resolve();
    };
    HTMLMediaElement.prototype.pause = function () { playing.delete(this); this.dispatchEvent(new Event('pause')); };
  });
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('audio[data-track=instrumental]')).not.toHaveAttribute('src');
  await page.getByRole('button', {name:'Unir pieza 1'}).click();
  await page.getByRole('button', {name:'Unir pieza 2'}).click();
  await expect(page.locator('audio[data-track=instrumental]')).not.toHaveAttribute('src');
  await page.getByRole('button', {name:'Unir pieza 3'}).click();
  await expect(page.locator('.opening-ritual')).toHaveCount(0);
  await expect(page.locator('audio[data-track=instrumental]')).toHaveAttribute('src', /Instrumental/);
  await page.getByRole('button', {name:'Activar música',exact:true}).click();
  await expect(page.getByRole('button', {name:'Pausar música',exact:true})).toBeVisible();
  await page.getByRole('button', {name:'Abrir expediente',exact:true}).click();
  await expect(page.locator('#final')).toBeAttached();
  await page.getByRole('button', {name:'Abre mi mensaje'}).click();
  await expect(page.locator('audio[data-track=morat]')).toHaveAttribute('src', /Morat/);
  await expect(page.locator('audio')).toHaveCount(2);
  await page.locator('.letter-space').getByRole('button', {name:'Pausar música',exact:true}).click();
  await page.getByRole('button', {name:'Cerrar mensaje'}).click();
  await expect(page.locator('.letter-space')).not.toBeVisible();
  await expect(page.locator('audio[data-track=instrumental]')).toHaveAttribute('src', /Instrumental/);
  await expect(page.locator('.sound-control').first()).toHaveText('Música en pausa');
  await page.getByRole('button', {name:'Abre mi mensaje'}).click();
  await expect(page.locator('.letter-space .sound-control')).toHaveText('Música en pausa');
  await page.locator('.letter-space').getByRole('button', {name:'Activar música',exact:true}).click();
  await expect(page.locator('.letter-space .sound-control')).toHaveText('Pausar música');
});

test('reduced motion, keyboard opening, and asset name resolution', async ({page}) => {
  await page.setViewportSize({width:393,height:852});
  await page.emulateMedia({reducedMotion:'reduce'});
  await unlock(page,false);
  await expect(page.locator('.words-after')).toHaveCSS('opacity','1');
  await expect(page.locator('.words-before')).toHaveCSS('opacity','0');
  await expect(page.locator('.envelope-visual').first()).toHaveCSS('animation-name','none');
  const resolution = await page.evaluate(async () => {
    // @ts-expect-error Vite browser module
    const assets = await import('/src/data/assets.ts');
    return {upper:assets.photo('SCENE4-LETTER01.JPG'),dots:assets.photo('scene7-main'),png:assets.photo('scene4-letter02')};
  });
  expect(resolution).toEqual({upper:'/assets/photos/scene4-letter01.jpg',dots:'/assets/photos/scene7-main..png',png:'/assets/photos/scene4-letter02..png'});
});
