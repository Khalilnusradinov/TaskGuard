"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth-routes"));
const ticketAPI_1 = __importDefault(require("./api/ticketAPI"));
const userAPI_1 = __importDefault(require("./api/userAPI"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Public route
router.use('/auth', auth_routes_1.default);
// Protected routes (require authentication)
router.use('/api/tickets', auth_1.authenticateToken, ticketAPI_1.default);
router.use('/api/users', auth_1.authenticateToken, userAPI_1.default);
exports.default = router;
