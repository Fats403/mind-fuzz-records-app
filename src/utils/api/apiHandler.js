/**
 * @name apiHandler
 * @description matches handler function to http method
 * @param handler
 */
export default function apiHandler(handler) {
  return async (req, res) => {
    const method = req.method.toLowerCase();
    const methods = Object.keys(handler).map((key) => key.toUpperCase());

    // check handler supports HTTP method
    if (!handler[method]) {
      res.setHeader("Allow", methods);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      await handler[method](req, res);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  };
}
