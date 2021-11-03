import { BrowserWindow } from 'electron';
import { Browser, Page } from 'puppeteer-core';
import { DefaultReturn } from '../../@types/controller';
import pie from 'puppeteer-in-electron'
interface IResoomerPuppeteer {
  browser: Browser;
}

export const initResoomerPuppeteer = ({ browser }: IResoomerPuppeteer) => {
  const goToResoomer = async (window: BrowserWindow): Promise<DefaultReturn<Page>> => {
    try {
      const url = 'https://resoomer.com/en/';


      await window.loadURL(url);

      const page = await pie.getPage(browser, window);

      await Promise.all([
        await page.waitForSelector('#contentText'),
        await page.waitForSelector('#btnSendText_V2'),
      ]);

      return {
        result: page
      };
    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  const getResume = async (page: Page, content: string): Promise<DefaultReturn<string>> => {
    try {

      // paste the content
      const pasteResume: DefaultReturn<undefined> = await page.evaluate((content) => {
        const resumeInput = document.querySelector<HTMLInputElement>('#contentText');

        if (!resumeInput) {
          return {
            error: 'Element not found'
          };
        }

        resumeInput.value = content;

        return {
          result: undefined,
        }

      }, content);

      if (pasteResume.error) {
        return {
          error: pasteResume.error,
        };
      }

      // click the button
      const clickButton: DefaultReturn<undefined> = await page.evaluate(() => {
        const resumeButton = document.querySelector<HTMLElement>('#btnSendText_V2');

        if (!resumeButton) {
          return {
            error: 'Element not found'
          };
        }
        resumeButton.click();
        return {
          result: undefined
        }
      });

      if (clickButton.error) {
        return {
          error: clickButton.error,
        };
      }



      const elementFound = await Promise.race([
        page.waitForSelector('#contentTexteResoomer_3')
          .then((selector) => Promise.resolve({ value: selector, status: 'done' })),

        page.waitForSelector('#conteneurTexteResumer')
          .then((selector) => Promise.resolve({ value: selector, status: 'alreadyResumed' })),
      ]);

      if (elementFound.status === 'alreadyResumed') {
        return {
          result: content,
        };
      }

      const resumedContent: DefaultReturn<string> = await page.evaluate(() => {
        const outputElement = document.querySelector<HTMLElement>('#contentTexteResoomer_3');

        if (!outputElement) {
          return {
            error: 'Element not found'
          };
        }
        const resumedContent = outputElement.innerText;

        return {
          result: resumedContent
        };
      });

      if (resumedContent.error) {
        return {
          error: pasteResume.error
        };
      }

      return {
        result: resumedContent.result,
      };


    } catch (err) {
      return {
        error: err.message,
      };
    }
  }

  return {
    goToResoomer,
    getResume,
  }
}



// {
//   const a = [[1, 5, 7, 8, 16], [1, 2, 3, 3, 3, 3, 4, 4, 6, 8]]
// 
//   const b = [1, 1, 2, 3, 3, 3, 3, 4, 4, 5, 6, 7, 8, 8, 16]
// 
// 
// 
// 
// 
// 
//   console.log(a,b)
// 
// }