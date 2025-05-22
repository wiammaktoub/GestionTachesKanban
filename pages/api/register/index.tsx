import type { NextApiRequest, NextApiResponse } from 'next';

import { connectToDatabase } from '@/util/mongodb';
import { hash } from 'bcrypt';

const SALTROUNDS = 10;

const isUserExists = async (db, email) => {
  const user = await db.collection('users').find({ email: email }).toArray();

  if (user.length > 0) {
    return true;
  }

  return false;
};

const createUser = async (body, res) => {
<<<<<<< HEAD:pages/api/register.tsx
  const { email, password, confirmPassword, id } = body;

  if (password === confirmPassword) {
    // Check if user email already exists
    const { db, client } = await connectToDatabase();
=======
  const { email, password, id, fullName } = body;

  const { db, client } = await connectToDatabase();
>>>>>>> 1ee86b7004c65fe3ee4548f53fdc4941ea0cd62c:pages/api/register/index.tsx

  if (client.isConnected()) {
    const isExistingUser = await isUserExists(db, email);

    if (isExistingUser) {
      const data = {
        message: 'Email is already registered'
      };

<<<<<<< HEAD:pages/api/register.tsx
        res.send(data);
      } else {
        let user = {};
        hash(password, SALTROUNDS, async (err, hash) => {
          // Store hash in your password DB.
          user = await db.collection('users').insertOne({ _id: id, email, password: hash });
        });
=======
      res.status(404).send(data);
      return;
    }

    // Create User
    let user = {};

    hash(password, SALTROUNDS, async (err, hash) => {
      // Store hash in your password DB.
      user = await db.collection('users').insertOne({ _id: id, email, password: hash, fullName });
    });
>>>>>>> 1ee86b7004c65fe3ee4548f53fdc4941ea0cd62c:pages/api/register/index.tsx

    if (user) {
      const data = {
        message: 'success'
      };

<<<<<<< HEAD:pages/api/register.tsx
          res.status(200).send(data);
        }
      }
=======
      res.status(200).send(data);
      return;
    }

    res.status(404).send({ message: 'failed' });
>>>>>>> 1ee86b7004c65fe3ee4548f53fdc4941ea0cd62c:pages/api/register/index.tsx

    return;
  } else {
    const data = {
      message: 'DB error',
      status: 400
    };

    res.send(data);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    createUser(req.body, res);

    return;
  } else {
    // Handle any other HTTP method
  }
}
