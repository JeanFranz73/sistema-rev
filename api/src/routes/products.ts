import { Router } from 'express'
import { isAdmin, isLoggedIn } from '@/middlewares/auth'
import ProductController from '@/controllers/ProductController'
import { ProductCategory, Product } from '@/types/Product'

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products: Product[] = await ProductController.findAll()

        if (!products) {
            res.status(404).json({
                message: 'Produtos não encontrados'
            })
        }

        res.status(200).json(products)
    } catch (err) {
        console.error('Erro ao selecionar produtos: ', err)
        res.status(500).json({
            message: err.message
        })
    }
})

router.post('/new', async (req, res) => {
    const newProduct = req.body

    delete newProduct.active

    try {
        const product = await ProductController.add(newProduct)

        if (!product) {
            res.status(404).json({
                message: 'Produto não encontrado'
            })
        }

        res.status(201).json(product)
    } catch (err) {

        console.error('Erro ao adicionar produto: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/categories', async (req, res) => {
    try {
        const categories: ProductCategory[] = await ProductController.getProductCategories()

        if (!categories) {
            res.status(404).json({
                message: 'Categorias não encontradas'
            })
        }

        res.status(200).json(categories)
    } catch (err) {
        console.error('Erro ao selecionar categorias de produtos: ', err)
        res.status(500).json({
            message: err.message
        })
    }
})

router.patch('/:id', isAdmin, async (req, res) => {
    const id = req.params.id
    const newProduct = req.body

    try {
        const product = await ProductController.edit(id, newProduct)

        res.status(200).json(product)
    } catch (err) {
        console.error('Erro ao selecionar produto: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

router.get('/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id

    try {
        const product: Product = await ProductController.find(id)

        if (!product) {
            res.status(404).json({
                message: 'Produto não encontrado'
            })
        }

        res.status(200).json(product)
    } catch (err) {
        console.error('Erro ao selecionar produto: ', err)
        res.status(400).json({
            message: err.message
        })
    }
})

export const productRouter = router