export const errorHandler = (err, _req, res, _next) => {
  console.error(err.stack);

  if (!res || typeof res.status !== "function") {
    console.warn("[ErrorHandler] res is invalid:", res);
    return;
  }

  res.status(500).json({
    status: 500,
    error: "서버에서 요청을 처리할 수 없습니다.",
  });
};
