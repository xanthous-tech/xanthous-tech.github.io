const fs = require('fs');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const { parse } = require('csv');


const result = {};
async function getDatafromCSV(pathTo, prefix = 'general') {
  const stream = fs.createReadStream(path.resolve(__dirname, pathTo)).pipe(
    parse({
      columns: true,
    }),
  );


  stream.on('data', (data) => {
    const { id } = data;
    // eslint-disable-next-line no-param-reassign
    delete data.id;
    result[`${prefix}.${id}`] = data;
  });
  return new Promise((res, rej) => {
    stream.on('end', () => {
      console.log(prefix, 'compiled i18n csv into json');
      res() 
    });
    stream.on('error', (err) => {
      console.log(prefix, 'EROOROR', err);
      rej()
    })
  })
}

async function init() {
  try {
    await getDatafromCSV('./countries.csv', 'country');
    await getDatafromCSV('./authors.csv', 'author');
    await getDatafromCSV('./techstack.csv', 'techstack');
    await getDatafromCSV('./general.csv', 'general');

    fs.writeFileSync(
      path.resolve(__dirname, 'data.json'),
      JSON.stringify(result),
    );
  } catch(err) {
    console.log(err)
  }
  console.log(result)

}

init();
