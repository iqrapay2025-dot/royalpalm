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
    year: 2025,
    exam: 'WASSCE for School Candidates',
    centre: 'Royal Palm International College, Ilorin',
    source: 'WAEC result checker (WAECDirect), viewed 4 August 2025',
    note: 'Selected results from the 2025 sitting.',
    candidates: [
      {
        id: 'A',
        results: [
          r('Civic Education', 'A1'), r('Tourism', 'A1'), r('English Language', 'C6'),
          r('General Mathematics', 'A1'), r('Agricultural Science', 'A1'), r('Biology', 'A1'),
          r('Chemistry', 'A1'), r('Physics', 'A1'),
          // TODO: Computer Studies shows "OUTSTANDING" on the WAEC page. That is not a grade.
          // Confirm the final grade with the school before adding it.
        ],
      },
      {
        id: 'B',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('Tourism', 'A1'),
          r('English Language', 'C4'), r('General Mathematics', 'A1'), r('Agricultural Science', 'A1'),
          r('Biology', 'A1'), r('Chemistry', 'A1'), r('Physics', 'A1'),
        ],
      },
      {
        id: 'C',
        results: [
          r('Economics', 'B2'), r('Geography', 'A1'), r('Civic Education', 'A1'),
          r('Tourism', 'B3'), r('English Language', 'C6'), r('General Mathematics', 'B2'),
          r('Biology', 'B3'), r('Chemistry', 'A1'), r('Physics', 'B3'),
        ],
      },
      {
        id: 'D',
        results: [
          r('Economics', 'B3'), r('Civic Education', 'A1'), r('Tourism', 'A1'),
          r('English Language', 'C5'), r('Further Mathematics', 'A1'), r('General Mathematics', 'A1'),
          r('Biology', 'A1'), r('Chemistry', 'A1'), r('Physics', 'A1'),
        ],
      },
      {
        id: 'E',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('Tourism', 'A1'),
          r('English Language', 'B3'), r('General Mathematics', 'B2'), r('Agricultural Science', 'A1'),
          r('Biology', 'B2'), r('Chemistry', 'A1'), r('Physics', 'A1'),
        ],
      },
      {
        id: 'F',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('Tourism', 'A1'),
          r('English Language', 'C6'), r('General Mathematics', 'B2'), r('Agricultural Science', 'A1'),
          r('Biology', 'A1'), r('Chemistry', 'A1'), r('Physics', 'A1'),
        ],
      },
      {
        // Two of the ten screenshots were the same candidate, so this appears once.
        id: 'G',
        results: [
          r('Geography', 'A1'), r('Civic Education', 'A1'), r('Tourism', 'A1'),
          r('English Language', 'C4'), r('Further Mathematics', 'B3'), r('General Mathematics', 'B2'),
          r('Biology', 'A1'), r('Chemistry', 'A1'), r('Physics', 'A1'),
        ],
      },
      {
        id: 'H',
        results: [
          r('Economics', 'B2'), r('Government', 'A1'), r('Islamic Studies', 'B2'),
          r('Literature in English', 'B3'), r('Civic Education', 'A1'), r('Tourism', 'B3'),
          r('English Language', 'C5'), r('Yoruba', 'C5'), r('General Mathematics', 'B2'),
        ],
      },
      {
        id: 'I',
        results: [
          r('Civic Education', 'A1'), r('Tourism', 'A1'), r('English Language', 'C5'),
          r('General Mathematics', 'A1'), r('Agricultural Science', 'A1'), r('Biology', 'A1'),
          r('Chemistry', 'A1'), r('Physics', 'A1'),
          // TODO: Computer Studies shows "OUTSTANDING" (not a grade). Confirm with the school.
        ],
      },
    ],
  },
]