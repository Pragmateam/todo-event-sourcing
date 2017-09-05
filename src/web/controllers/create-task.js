module.exports = core => (req, res) => {
  const result = core.createTask(req.body);
  result.fold(
    () => {},
    uuid => {
      res.status(201).send({ uuid });
    }
  );
};
