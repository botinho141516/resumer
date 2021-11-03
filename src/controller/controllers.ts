import { BrowserWindow } from 'electron';
import { initPuppeteer } from "./puppeteer/puppeteer";
import { initResoomerPuppeteer } from "./puppeteer/resoomer";


export const initControllers = async () => {


  const { browser, closeWindow } = await initPuppeteer();
  const resoomerController = initResoomerPuppeteer({ browser });

  const resumeText = async (text: string) => {
    try {

      const window = new BrowserWindow();

      const { error: goToResoomerError, result: page } = await resoomerController.goToResoomer(window);


      if (goToResoomerError) {
        throw new Error(goToResoomerError);
      }

      const { error: getResumeError, result: resume } = await resoomerController.getResume(page, text);

      if (getResumeError) {
        throw new Error(getResumeError);
      }

      // await closeWindow(window);
      return resume;
    } catch (err) {
      console.log({ err });
    }

  }

  return {
    ...resoomerController,
    closeWindow,
    browser,
    resumeText,
  }
}