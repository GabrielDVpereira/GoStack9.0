/* eslint-disable no-console */

export default (req, res, next) => {
  console.time('request');
  console.log(`Method: ${req.method}, URL ${req.url}`);
  next();
  console.timeEnd('request');
};
