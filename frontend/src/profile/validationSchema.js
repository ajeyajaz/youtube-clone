import joi from 'joi'

export const channelSchema = joi.object({
        name: joi.string().trim().min(3).max(255).required(),
        handle: joi.
            string().
            pattern(/^[A-Za-z0-9_-]{3,15}$/)
            .message('Use 3-15 characters. Only letters, numbers, _ or - are allowed.')
});