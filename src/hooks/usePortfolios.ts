import { useState, useEffect, useCallback } from 'react'  // ← useCallback 추가
import { supabase } from '../lib/supabaseClient'

export type Portfolio = {
  id: string
  title: string
  description: string
  thumbnail_url: string
  detail_images: string[]
  category: string
  order_index: number
}

export function usePortfolios() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {   // ← 함수로 분리
    setLoading(true)
    const { data } = await supabase
      .from('portfolios')
      .select('*')
      .order('order_index', { ascending: true })
    setPortfolios(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { portfolios, loading, refetch: fetchData }  // ← refetch 추가
}

export function usePortfolio(id: string) {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    async function fetch() {
      const { data } = await supabase
        .from('portfolios')
        .select('*')
        .eq('id', id)
        .single()
      setPortfolio(data)
      setLoading(false)
    }
    fetch()
  }, [id])

  return { portfolio, loading }
}