import { Browser, Page } from 'puppeteer-core';
import { DefaultReturn } from '..';


export const initResoomerPuppeteer = () => {
  const goToResoomer = async (browser: Browser): Promise<DefaultReturn<Page>> => {
    try {
      const page = await browser.newPage();

      await page.goto('https://resoomer.com/en/', { timeout: 15000 });

      await page.waitForSelector('#contentText');

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

      if (pasteResume) {
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

