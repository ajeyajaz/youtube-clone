import { Category } from '../models/category.model.js'
import pagination from '../utils/pagination.js'

export async function getCategories(req, res) {
    const {skip, limit} = pagination(req.query.page, req.query.limit);

    const categories = await Category.find()
        .skip(skip)
        .limit(limit)
        .select('_id, name')
        .sort({createdAt: -1});

    return res.status(200).json(categories);
}