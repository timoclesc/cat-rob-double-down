export interface Pledge {
  id: string
  donor_name: string
  amount: number
  charity_name: string
  bet_choice: "FOR" | "AGAINST"
  created_at: string
}

export interface Update {
  id: string
  date: string
  title: string
  content: string
  created_at: string
}

export interface DashboardStats {
  totalFor: number
  totalAgainst: number
  maxPayout: number
}
