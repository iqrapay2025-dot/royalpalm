//
// WAEC (WASSCE for School Candidates) results for Royalpalm International College, Ilorin.
//
// PRIVACY: candidates are anonymised on purpose ("Candidate A", "B", ...). Do not add names,
// exam numbers, scratch-card serials or PINs to this file. Add names only with the school's
// written approval (and the parents' consent where the school requires it).

export type WaecGrade = 'A1' | 'B2' | 'B3' | 'C4' | 'C5' | 'C6' | 'D7' | 'E8' | 'F9'

export type SubjectResult = { subject: string; grade: WaecGrade }
export type WaecCandidate = { id: string; results: SubjectResult[] }
export type WaecYear = {
  year: number
  exam: string
  centre: string
  source: string
  note?: string
  candidates: WaecCandidate[]
}

export const GRADE_ORDER: WaecGrade[] = ['A1', 'B2', 'B3', 'C4', 'C5', 'C6', 'D7', 'E8', 'F9']
export const gradeRank = (g: WaecGrade) => GRADE_ORDER.indexOf(g)
export const isCredit = (g: WaecGrade) => gradeRank(g) <= gradeRank('C6')

export type GradeBucket = 'A' | 'B' | 'C' | 'below'
export const bucketOf = (g: WaecGrade): GradeBucket =>
  g === 'A1' ? 'A' : g === 'B2' || g === 'B3' ? 'B' : isCredit(g) ? 'C' : 'below'

export const GRADE_KEY = [
  ['A1', 'Excellent'],
  ['B2', 'Very Good'],
  ['B3', 'Good'],
  ['C4–C6', 'Credit'],
  ['D7–E8', 'Pass'],
  ['F9', 'Fail'],
] as const

const r = (subject: string, grade: WaecGrade): SubjectResult => ({ subject, grade })

export const WAEC_RESULTS: WaecYear[] = [
  {
    year: 2026,
    exam: 'WASSCE for School Candidates',
    centre: 'Royal Palm International College, Ilorin',
    source: 'WAEC result checker (WAECDirect), viewed 5 August 2026',
    note: 'Results analysis for the 2026 WASSCE sitting.',
    candidates: [
      {
        id: 'A',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('French', 'A1'), r('General Mathematics', 'B2'), r('Biology', 'B2'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'B',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('Further Mathematics', 'A1'), r('General Mathematics', 'A1'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Technical Drawing', 'B3'),
        ],
      },
      {
        id: 'C',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('Further Mathematics', 'A1'), r('General Mathematics', 'A1'), r('Biology', 'B2'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'D',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('Further Mathematics', 'A1'), r('General Mathematics', 'B3'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'E',
        results: [
          r('Geography', 'B2'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('Further Mathematics', 'A1'), r('General Mathematics', 'B2'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Technical Drawing', 'B3'),
        ],
      },
      {
        id: 'F',
        results: [
          r('Commerce', 'A1'), r('Accounting', 'A1'), r('Economics', 'A1'), r('Government', 'A1'), r('Islamic Studies', 'B3'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('General Mathematics', 'B2'),
        ],
      },
      {
        id: 'G',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('General Mathematics', 'B3'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Technical Drawing', 'B3'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'H',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'C4'), r('General Mathematics', 'B3'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Digital Technologies', 'A1'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'I',
        results: [
          r('Economics', 'B2'), r('Geography', 'A1'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('Further Mathematics', 'A1'), r('General Mathematics', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'J',
        results: [
          r('Economics', 'B2'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('General Mathematics', 'B3'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'K',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('General Mathematics', 'B3'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Digital Technologies', 'A1'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'L',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('Further Mathematics', 'A1'), r('General Mathematics', 'B3'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'M',
        results: [
          r('Commerce', 'A1'), r('Accounting', 'A1'), r('Economics', 'B3'), r('Government', 'A1'), r('Islamic Studies', 'A1'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('General Mathematics', 'B3'),
        ],
      },
      {
        id: 'N',
        results: [
          r('Christian Religious Studies', 'A1'), r('Economics', 'B2'), r('Government', 'B3'), r('Literature in English', 'B2'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('Yoruba', 'B3'), r('General Mathematics', 'B2'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'O',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'B3'), r('French', 'A1'), r('General Mathematics', 'B2'), r('Biology', 'B2'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'P',
        results: [
          r('Economics', 'A1'), r('Government', 'A1'), r('Islamic Studies', 'A1'), r('Literature in English', 'B2'), r('Civic Education', 'A1'), r('English Language', 'B3'), r('General Mathematics', 'B3'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'Q',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('English Language', 'C6'), r('General Mathematics', 'B3'), r('Agricultural Science', 'A1'), r('Biology', 'B3'), r('Chemistry', 'B2'), r('Physics', 'B3'),
        ],
      },
      {
        id: 'R',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'C4'), r('General Mathematics', 'B3'), r('Agricultural Science', 'B2'), r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B2'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'S',
        results: [
          r('Civic Education', 'A1'), r('English Language', 'C6'), r('Further Mathematics', 'A1'), r('General Mathematics', 'B3'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Technical Drawing', 'B3'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'T',
        results: [
          r('Economics', 'B3'), r('Geography', 'B3'), r('Government', 'B3'), r('Islamic Studies', 'A1'), r('Literature in English', 'B3'), r('Civic Education', 'A1'), r('English Language', 'C4'), r('General Mathematics', 'B3'),
        ],
      },
      {
        id: 'U',
        results: [
          r('Christian Religious Studies', 'A1'), r('Economics', 'B2'), r('Government', 'B2'), r('Literature in English', 'B2'), r('Civic Education', 'A1'), r('English Language', 'C6'), r('Yoruba', 'A1'), r('General Mathematics', 'B3'),
        ],
      },
      {
        id: 'V',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('English Language', 'C4'), r('General Mathematics', 'B3'), r('Chemistry', 'A1'), r('Physics', 'A1'), r('Technical Drawing', 'B3'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'W',
        results: [
          r('Commerce', 'A1'), r('Accounting', 'A1'), r('Economics', 'B3'), r('Government', 'B2'), r('Islamic Studies', 'A1'), r('Civic Education', 'A1'), r('English Language', 'C5'), r('General Mathematics', 'B3'),
        ],
      },
      {
        id: 'X',
        results: [
          r('Christian Religious Studies', 'A1'), r('Economics', 'B3'), r('Government', 'B2'), r('Literature in English', 'B2'), r('Civic Education', 'A1'), r('English Language', 'C5'), r('Yoruba', 'B3'), r('General Mathematics', 'B3'),
        ],
      },
      {
        id: 'Y',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('English Language', 'C5'), r('Further Mathematics', 'B2'), r('General Mathematics', 'B3'), r('Chemistry', 'B2'), r('Physics', 'A1'), r('Digital Technologies', 'A1'),
        ],
      },
      {
        id: 'Z',
        results: [
          r('Commerce', 'A1'), r('Accounting', 'A1'), r('Economics', 'B3'), r('Government', 'B2'), r('Islamic Studies', 'A1'), r('Civic Education', 'A1'), r('English Language', 'C5'), r('General Mathematics', 'C4'),
        ],
      },
      {
        id: 'AA',
        results: [
          r('Economics', 'B3'), r('Civic Education', 'A1'), r('English Language', 'C5'), r('General Mathematics', 'B3'), r('Biology', 'C4'), r('Chemistry', 'A1'), r('Physics', 'B3'), r('Foods & Nutrition', 'A1'),
        ],
      },
      {
        id: 'AB',
        results: [
          r('Economics', 'B3'), r('Geography', 'B3'), r('Government', 'B3'), r('Islamic Studies', 'A1'), r('Literature in English', 'B3'), r('Civic Education', 'A1'), r('English Language', 'C4'), r('General Mathematics', 'B3'),
        ],
      },
      {
        id: 'AC',
        results: [
          r('Christian Religious Studies', 'B2'), r('Economics', 'D7'), r('Government', 'B3'), r('Literature in English', 'B3'), r('Civic Education', 'A1'), r('English Language', 'C6'), r('Yoruba', 'C5'), r('General Mathematics', 'C5'),
        ],
      },
      {
        id: 'AD',
        results: [
          r('Economics', 'C5'), r('Government', 'B2'), r('Islamic Studies', 'A1'), r('Literature in English', 'B2'), r('Civic Education', 'A1'), r('English Language', 'C6'), r('Yoruba', 'D7'), r('General Mathematics', 'B3'),
        ],
      },
    ],
  },
]
