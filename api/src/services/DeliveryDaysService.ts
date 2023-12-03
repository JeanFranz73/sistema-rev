import DefaultService from '@/services/default'
import { DeliveryDay } from '@/types/DeliveryDay'

const table: string = 'delivery_days'

export class DeliveryDaysService extends DefaultService<DeliveryDay> {

    constructor() {
        super(table)
    }

}

export default new DeliveryDaysService()