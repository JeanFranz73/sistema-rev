import { DeliveryDay } from '@/types/DeliveryDay'
import DeliveryDayService from '@/services/DeliveryDaysService'

class DeliveryDayController {
    async findAll(): Promise<DeliveryDay[]> {
        const DeliveryDays: DeliveryDay[] = await DeliveryDayService.findAll()
        return DeliveryDays
    }

    async find(id: number | string): Promise<DeliveryDay> {
        const DeliveryDay: DeliveryDay = await DeliveryDayService.findById(id)

        if (!DeliveryDay) {
            throw new Error('Produto não encontrado')
        }

        return DeliveryDay
    }

    async add(DeliveryDay: DeliveryDay) {

        const DeliveryDayId = await DeliveryDayService.create(DeliveryDay)

        if (DeliveryDayId) {
            return await DeliveryDayService.findById(DeliveryDayId[0])
        }

        throw new Error('Erro ao adicionar produto')
    }

    async edit(DeliveryDayId: number | string, DeliveryDay: DeliveryDay) {
        const dbDeliveryDay = await this.find(DeliveryDayId)

        await DeliveryDayService.update(dbDeliveryDay.id, DeliveryDay)

        return {
            ...dbDeliveryDay,
            ...DeliveryDay
        }
    }
}

export default new DeliveryDayController()