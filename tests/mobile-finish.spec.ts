import { test, expect } from '@playwright/test';

for (const [width,height] of [[360,780],[390,844],[412,915],[428,926]]) {
  test(`mobile finish ${width}x${height}`, async ({page}, info) => {
    await page.setViewportSize({width,height});
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', entry => {if(entry.type()==='error') errors.push(entry.text());});
    const prefix = `.verification/finish-${info.project.name}-${width}`;
    await page.goto('/');
    await expect(page.locator('.recipient-name')).toHaveText('Para mi Emperatriz, la mujer más trabajadora que conozco.');
    await page.evaluate(()=>document.fonts.ready);
    await page.screenshot({path:`${prefix}-intro.png`});
    for(let i=1;i<=3;i++) await page.getByRole('button',{name:`Unir pieza ${i}`}).click();
    await page.waitForTimeout(800);
    await page.screenshot({path:`${prefix}-assembled.png`});
    await expect(page.locator('.opening-ritual')).toHaveCount(0);
    await page.getByRole('button',{name:'Abrir expediente',exact:true}).click();
    await expect(page.locator('#mail')).toBeAttached();
    for (const chapter of ['mail','final']) {
      const section = page.locator(`#${chapter}`);
      await section.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top,behavior:'instant'}));
      await section.locator('img').evaluateAll(async images=>{await Promise.all(images.map(img=>(img as HTMLImageElement).decode()));});
      await page.waitForTimeout(1800);
      await page.screenshot({path:`${prefix}-${chapter}.png`});
      expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
      await expect(section.locator('.photo-missing')).toHaveCount(0);
    }
    await page.getByRole('button',{name:'Abre mi mensaje'}).click();
    await page.waitForTimeout(450);
    await page.screenshot({path:`${prefix}-envelope-transition.png`});
    await expect(page.locator('.message-letter')).toHaveCSS('opacity','1');
    await page.screenshot({path:`${prefix}-letter.png`});
    await page.locator('.letter-return').scrollIntoViewIfNeeded();
    await expect(page.getByText('Te amo. Siempre. ♡',{exact:true})).toBeInViewport();
    await page.screenshot({path:`${prefix}-letter-end.png`});
    await page.locator('.letter-return').click();
    await expect(page.locator('.letter-space')).not.toBeVisible();
    await expect(page.getByRole('button',{name:'Abre mi mensaje'})).toBeFocused();
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.getByRole('button',{name:'Abre mi mensaje'}).click();
    await expect(page.locator('.letter-envelope')).not.toBeVisible();
    await expect(page.locator('.message-letter')).toHaveCSS('opacity','1');
    await page.keyboard.press('Escape');
    expect(errors).toEqual([]);
  });
}

test('mobile finish crossfade real media and interrupted fade', async ({page}) => {
  await page.setViewportSize({width:390,height:844});
  await page.addInitScript(()=>{
    const original = AudioContext.prototype.createGain;
    const nodes: GainNode[] = [];
    Object.defineProperty(window,'qaGains',{value:nodes});
    AudioContext.prototype.createGain = function () {const node=original.call(this);nodes.push(node);return node;};
  });
  const gains = () => page.evaluate(()=> {
    const nodes = (window as unknown as {qaGains: GainNode[]}).qaGains;
    return nodes.length ? nodes.map(node=>node.gain.value) : Array.from(document.querySelectorAll('audio'), audio=>audio.volume);
  });
  await page.goto('/');
  await page.getByRole('button',{name:'Entrar directamente'}).click();
  await expect(page.locator('.opening-ritual')).toHaveCount(0);
  await expect.poll(gains).toEqual([expect.closeTo(.3,2),0]);
  await page.getByRole('button',{name:'Abrir expediente',exact:true}).click();
  await page.getByRole('button',{name:'Abre mi mensaje'}).click();
  await expect.poll(async()=>{const [a,b]=await gains();return a>0&&a<.3&&b>0&&b<.65;}).toBe(true);
  await expect.poll(gains).toEqual([0,expect.closeTo(.65,2)]);
  await expect.poll(()=>page.locator('audio').evaluateAll(items=>items.map(item=>(item as HTMLAudioElement).paused))).toEqual([true,false]);
  await page.getByRole('button',{name:'Cerrar mensaje'}).click();
  await expect.poll(async()=>{const [a,b]=await gains();return a>0&&a<.3&&b>0&&b<.65;}).toBe(true);
  await page.locator('.sound-control').first().click();
  await expect.poll(()=>page.locator('audio').evaluateAll(items=>items.every(item=>(item as HTMLAudioElement).paused))).toBe(true);
  await expect.poll(gains).toEqual([0,0]);
  await page.getByRole('button',{name:'Abre mi mensaje'}).click();
  await expect(page.locator('.letter-space .sound-control')).toHaveAttribute('aria-pressed','false');
  await page.locator('.letter-space .sound-control').click();
  await expect.poll(gains).toEqual([0,expect.closeTo(.65,2)]);
});
