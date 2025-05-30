export const errorHandler = (err, _req, res) => {
  console.error(err.stack);

  res.status(500).json({
    status: 500,
    error: "서버에서 요청을 처리할 수 없습니다.",
  });
};
