import { User } from '../models/index.js';
import { generateToken } from '../utils/index.js';

export const signup = async (req, res) =>
{
  const { email, password } = req.body;

  try
  {
    const userExists = await User.findOne({email,});

    if (userExists)
    {
      return res.status(400).json({message: 'User already exists',});
    }

    const createdUser = new User({email, password,});
    await createdUser.save();

    const token = generateToken(createdUser._id);
    res.status(201).json({ token, userId: createdUser._id });
  }
  catch (error)
  {
    res.status(500).json({message: 'Server error',});
  }
};

export const login = async (req, res) =>
{
  const { email, password } = req.body;

  try
  {
    const user = await User.findOne({email,});
    if (!user)
    {
      return res.status(400).json({message: 'Invalid credentials',});
    }

    const isAuthenticated = await user.comparePassword(password);
    if (!isAuthenticated)
    {
      return res.status(400).json({message: 'Invalid credentials',});
    }

    const token = generateToken(user._id);
    res.json({token, userId: user._id,});
  }
  catch (error)
  {
    res.status(500).json({ message: 'Server error' });
  }
};