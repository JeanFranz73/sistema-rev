import { Router } from 'express'
import { isLoggedIn } from '@/middlewares/auth'
import ProductController from '@/controllers/ProductController'
import { ProductCategoryType, ProductType } from '@/types/Product'

export const productsRouter = Router()

productsRouter.get('/', async (req, res) => {
    try {
        const users: ProductType[] = await ProductController.findAll()

        if (!users) {
            res.status(404).json({
                message: 'Produtos não encontrados'
            })
        }

        res.status(200).json(users)
    } catch (err) {
        console.error('Erro ao selecionar produtos: ', err)
        res.status(500).json({
            message: err.message
        })
    }
})

productsRouter.get('/categories', async (req, res) => {
    try {
        const categories: ProductCategoryType[] = await ProductController.getProductCategories()

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

const router = Router()

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

router.get('/', async (req, res) => {
    res.status(422).json({
        message: 'Produto não especificado'
    })
})

router.patch('/:id', isLoggedIn, async (req, res) => {
    const id = req.params.id
    const newProduct = req.body

    try {
        const product = await ProductController.edit(id, newProduct)

        if (!product) {
            res.status(404).json({
                message: 'Produto não encontrado'
            })
        }

        res.status(200).json(product)
    } catch (err) {
        console.error('Erro ao selecionar produto: ', err)
        res.status(400).json({
            message: 'Erro ao selecionar produto'
        })
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const product: ProductType = await ProductController.find(id)

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