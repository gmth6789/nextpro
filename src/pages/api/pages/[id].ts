import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const page = await prisma.page.findUnique({
      where: { id: Number(id) },
    });
    res.json(page);
  } else if (req.method === 'PUT') {
    const { title, content } = req.body;
    const page = await prisma.page.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json(page);
  } else if (req.method === 'DELETE') {
    await prisma.page.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } else {
    res.status(405).end();
  }
}
