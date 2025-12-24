const z = require('zod')


const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(20, "Username too long").regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
    email: z.string().email("Invalid email format").min(5, "Email too short"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(100, "Password too long"),
});


const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});


module.exports = {
    registerSchema,loginSchema
}