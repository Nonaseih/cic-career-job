export type Job = {
  id: number
  title: string
  company_name: string
  description: string | null
  salary_min: number | null
  salary_max: number | null
  employment_type: string | null
  experience: string | null
  areas: string[] | null
  tags: string[] | null
  is_published: boolean
  created_at: string
  updated_at: string
}
