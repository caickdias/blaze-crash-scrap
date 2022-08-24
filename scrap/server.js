const puppeteer = require('puppeteer');
const fs = require('fs');

let prev = 0;
const data = [];

const getEntries = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();    
    await page.setViewport({ width: 1920, height: 1080})
    await page.goto('https://blaze.com/pt/games/crash');    
        
    setInterval(async () => {
        const latestValue = await page.evaluate(() => {
            return parseFloat(document.querySelector('.entries span').innerText.replace('X', ''));            
        })

        if(latestValue == prev){

        } else {
            prev = latestValue;
            data.push({
                value: latestValue,
                date: new Date(),
            })
            fs.writeFile("entries.js", JSON.stringify(data), (err) => {
                if (err)
                  console.log(err);
                else {            
                }
              });   
            }                    
            console.log(latestValue);

    }, 10000);        
 
}
getEntries();
//-------------------------------------------------------------