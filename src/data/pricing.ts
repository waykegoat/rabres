export type TariffId = 'worker' | 'specialist' | 'brigade'
export type UrgencyId = 'planned' | 'tomorrow' | 'today'

export interface Tariff {
  id: TariffId
  title: string
  audience: string
  shiftPrice: number
  features: string[]
  featured?: boolean
}

export interface UrgencyOption {
  id: UrgencyId
  label: string
  hint: string
  multiplier: number
}

export interface EstimateInput {
  tariffId: TariffId
  people: number
  shifts: number
  urgencyId: UrgencyId
}

export interface Estimate {
  total: number
  pricePerShift: number
  volumeSaving: number
}

export const SHIFT_HOURS = 8

export const TARIFFS: Tariff[] = [
  {
    id: 'worker',
    title: 'Разнорабочий',
    audience: 'Погрузка, уборка, демонтаж, подсобные работы',
    shiftPrice: 3500,
    features: [
      'Физически крепкие работники',
      'Своя спецодежда и СИЗ',
      'Ручной инструмент с собой',
      'Выходим ночью и в выходные',
      'Замена работника в тот же день',
    ],
    featured: true,
  },
  {
    id: 'specialist',
    title: 'Специалист',
    audience: 'Сварка, электрика, сантехника, отделка',
    shiftPrice: 5500,
    features: [
      'Профильная квалификация и допуски',
      'Профессиональный инструмент',
      'Гарантия на выполненные работы',
      'Работа по чертежам и ТЗ',
      'Фотоотчёт по этапам',
    ],
  },
  {
    id: 'brigade',
    title: 'Бригада на объект',
    audience: 'Долгосрочные подряды от 5 человек',
    shiftPrice: 3200,
    features: [
      'Ставка ниже при объёме от 5 человек',
      'Закреплённый бригадир',
      'Договор и безналичный расчёт',
      'Отсрочка платежа для юрлиц',
      'Табель учёта рабочего времени',
    ],
  },
]

export const URGENCY_OPTIONS: UrgencyOption[] = [
  { id: 'planned', label: 'На неделе', hint: 'Плановый выезд', multiplier: 1 },
  { id: 'tomorrow', label: 'Завтра', hint: 'Бригада с утра', multiplier: 1.1 },
  { id: 'today', label: 'Сегодня', hint: 'Срочный выезд', multiplier: 1.25 },
]

const VOLUME_DISCOUNTS = [
  { minShifts: 20, multiplier: 0.85 },
  { minShifts: 10, multiplier: 0.9 },
  { minShifts: 5, multiplier: 0.95 },
]

export function getTariff(id: TariffId): Tariff {
  return TARIFFS.find((tariff) => tariff.id === id) ?? TARIFFS[0]
}

export function getUrgency(id: UrgencyId): UrgencyOption {
  return URGENCY_OPTIONS.find((option) => option.id === id) ?? URGENCY_OPTIONS[0]
}

export function getVolumeMultiplier(shifts: number): number {
  return VOLUME_DISCOUNTS.find((discount) => shifts >= discount.minShifts)?.multiplier ?? 1
}

export function calculateEstimate(input: EstimateInput): Estimate {
  const tariff = getTariff(input.tariffId)
  const urgency = getUrgency(input.urgencyId)

  const base = tariff.shiftPrice * input.people * input.shifts
  const withUrgency = base * urgency.multiplier
  const volumeMultiplier = getVolumeMultiplier(input.shifts)

  const total = roundTo(withUrgency * volumeMultiplier, 100)

  return {
    total,
    pricePerShift: roundTo(total / (input.people * input.shifts), 10),
    volumeSaving: roundTo(withUrgency - withUrgency * volumeMultiplier, 100),
  }
}

export function formatMoney(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function roundTo(value: number, step: number): number {
  return Math.round(value / step) * step
}
