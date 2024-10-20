const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0dZeXBlSVdLcTdSUTRRV1R0cXRaN1BHSnZTek9vNWJBUkVGaWl2UW1IZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWNORndwZE5kQStlVFFxWG15QXFSUEpHWjVXcWpFSkZaM0dGOHhXdUdHMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTldnbkhDaDNiRkFJQ3VBTURib0RscnlxQWN3TUV6bitaUDliYlZqMUhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJQWktXYmJtb0RtZWhCZDRNM0RvaDlBa1FIS3ZEYitVZTIzbGNmZHZFQ1hJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZPUEduSEkwbWo5Z3JNVFJ1Y1Z6YlZKOWEvcHNSU2F3bjVyZUZGeTBhVkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5EN0lnb1FtMkEyTE1XWmx6L2YrWHpHQVpOYVBFZXl6azlVTWpOMWgvRTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid05GdVhqYVlBUjlpUmFUcU9SOGV1WHpEbVJYbnk4dFY2Q2lRWGxXQnoyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXdWZjM2SklIRDEwTWxpWTBNREt2ODdTanJFbEhBeWJva01MdHhjY2lSWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InozUXF1KzJ3cm9hc2lCMURBTitTZk80Unc1R2RjN2RHOW5waGFGSDYrWEEwaVRCRm5HaXV4WlJqNzcvN1VqYnIvUjl6WkRLOTZTWHBsc0ZGRHJKTUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjU0LCJhZHZTZWNyZXRLZXkiOiIzV0pIVG5zR0RSR0pad0wvckYrb1duYWVhblZmR0pLSjBOQmdtcUhoTjIwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDcwNjQxOTAzMTFAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiM0FCMUIwMTg1NDYyNDUwNTZDNEIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyOTQ1OTQ0Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiS3lDRk1iN0hUU09RVXpCZkEtRllNQSIsInBob25lSWQiOiI4ZjYxYzY5OC1iY2ExLTQ2ODAtYmRmZi1hYWZiYjc0MWViN2UiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnFlS3I2YWRKOERFdXBYNFdxZmwyelN1eGVRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imw1RXFpZUpNekpmVXhucjRVTHdMR0RrdjBvbz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJFUDZBNEw4QiIsIm1lIjp7ImlkIjoiMjM0NzA2NDE5MDMxMTo5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkNhcmxpZm9ybmlhIEp1bmlvciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3lUbFlBRUVPRHAxYmdHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiQkhacDVCdVRnZ0psNUNSZFJxdDlrZHBSMEdBVWVRMitTWU94RmU1YmxFWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoienpJUzlVRHV0ZHZ6ZFBoS0FMdkkvS0V5ekQxTkV2OHNWUkhHQjhnNnBudHVscmJ6Ryt5NVhNcGt3b2hhWXoyOWhxOFo4NVhVSVJLRDZ1RXEzYWxVaHc9PSIsImRldmljZVNpZ25hdHVyZSI6InJwaUxhdHJ0dDBObzdFS21tVndOVVQ0Y0ZoRkgzZU5wVUMvdzcxZnJXQ0sxTWJsTjhhbmRiN3haLzlya3NFa1BwVlhUdnlSL0NkTmRsbHpoUzA4ZUFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0NzA2NDE5MDMxMTo5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFSMmFlUWJrNElDWmVRa1hVYXJmWkhhVWRCZ0ZIa052a21Ec1JYdVc1UkcifX1dLCJwbGF0Zm9ybSI6InNtYmkiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjk0NTk0MzcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQzMzIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "EMMZY BEAT",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2347064190311",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
