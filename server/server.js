const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* =====================================
   API KECAMATAN SURABAYA
===================================== */

app.get('/api/kecamatan', async (req, res) => {

    try {

        const result = await pool.query(`

            SELECT
                id,
                "NAME_3",
                "DBD_20",
                "JPddk_20",
                ST_AsGeoJSON(geom)::json AS geometry

            FROM "BatasKecamatanSurabaya2"

        `);

        const geojson = {

            type: 'FeatureCollection',

            features: result.rows.map(row => ({

                type: 'Feature',

                geometry: row.geometry,

                properties: {
                    id: row.id,
                    kecamatan: row.NAME_3,
                    dbd: row.DBD_20,
                    penduduk: row.JPddk_20
                }

            }))

        };

        res.json(geojson);

    } catch (err) {

        console.error(err);

        res.status(500).send('Server Error');

    }

});

/* =====================================
   SERVER
===================================== */

app.listen(5000, () => {

    console.log('Server running on port 5000');

});