module.exports = core => (req, res) => {
  const uuid = core.createTask(req.body);
  res.status(201).send({ uuid });
};
