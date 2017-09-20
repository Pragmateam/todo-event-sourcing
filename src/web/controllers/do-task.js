module.exports = core => ({ params }, res) => {
  const { uuid } = params;
  const result = core.doTask({ uuid });

  result.fold(
    () => {
      res.status(404).send();
    },
    () => {
      res.status(200).send();
    }
  );
};
