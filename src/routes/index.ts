import { Router, Request, Response } from 'express';

const router = Router();

//Routes here

router.use((req: Request, res: Response) => {
  res.status(404);
  res.send({ success: false, message: 'Wrong adress' });
});

export default router;
