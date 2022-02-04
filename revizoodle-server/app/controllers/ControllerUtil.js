const renderAsJson = function(
    res,
    promise,
    options) {
  options.notFoundMessage = options.notFoundMessage ||
      'Not found';
  options.dataTransformer = options.dataTransformer ||
      function(x) {
        return x;
      };

  promise.
      then(data => {
        if (!data) {
          res.status(404).json({
            error: {
              message: options.notFoundMessage,
            },
          });
        } else {
          res.json(options.dataTransformer(data));
        }
      }).
      catch(error => {
        console.error(error);
        res.status(500).json({error});
      });
};

module.exports = {
  renderAsJson
};