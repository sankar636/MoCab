import express from 'express';
import { getCoordinates, distanceTime, getAutoCompleteSuggession } from '../controllers/map.controller.js';
import { query } from 'express-validator';
import { verifyJWT } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.get(
    '/coordinates',
    [query('address').notEmpty().withMessage('Address is required')],
    verifyJWT,
    getCoordinates
);

router.get(
    '/distance',
    [
        query('origin').notEmpty().withMessage('Origin is required'),
        query('destination').notEmpty().withMessage('Destination is required')
    ],
    verifyJWT,
    distanceTime
);

router.get(
  '/getsuggession',
  [],
  verifyJWT,
  getAutoCompleteSuggession
)

router.get(
  '/getsuggession',
  verifyJWT,
  getAutoCompleteSuggession
)

export default router;


/*

router.get('/get-coordinates', async (req, res) => {
  try {
    const address = req.query.address;
    if (!address) return res.status(400).json({ error: 'Address required' });

    const coordinates = await getAddressCoordinate({ address });
    res.json(coordinates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},
  verifyJWT,
  getCoordinates
);

// router.get('/ping', (req, res) => {
//     res.send("✅ Map router is working");
//   });

router.get('/get-distancetime', async (req, res) => {
  try {
    const origin = req.query.origin;
    const destination = req.query.destination;
    if (!origin || !destination) return res.status(400).json({ error: 'origin and destination Required' });

    const result = await getDistanceTime({ origin, destination });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
},
  verifyJWT,
  getCoordinates
);

*/