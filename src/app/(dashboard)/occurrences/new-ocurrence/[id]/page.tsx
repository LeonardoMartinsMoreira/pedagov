'use client'

import Link from 'next/link'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// Definindo o esquema de validação com Zod
const occurrenceFormSchema = z.object({
  student: z.string().min(1, 'Selecione um aluno'),
  type: z.string().min(1, 'Selecione um tipo de ocorrência'),
  description: z
    .string()
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  date: z.string().min(1, 'Selecione uma data'),
  time: z.string().min(1, 'Selecione um horário'),
  school: z.string(),
  responsible: z.string(),
})

// Tipo inferido do esquema Zod
type OccurrenceFormValues = z.infer<typeof occurrenceFormSchema>

export default function NewOccurrencePage() {
  // Valores padrão para o formulário
  const defaultValues: Partial<OccurrenceFormValues> = {
    school: 'Escola Municipal A',
    responsible: 'Maria Eduarda (Pedagoga)',
    date: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    time: '14:30',
  }

  // Configuração do React Hook Form com Zod
  const form = useForm<OccurrenceFormValues>({
    resolver: zodResolver(occurrenceFormSchema),
    defaultValues,
  })

  // Função para lidar com o envio do formulário
  const onSubmit = async (data: OccurrenceFormValues) => {
    try {
      // Simulando um atraso de processamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Dados da ocorrência:', data)

      // Redirecionar para a lista após o envio bem-sucedido
      window.location.href = '/'
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error)
    }
  }

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para listagem
        </Link>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-medium">Nova Ocorrência</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="student"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aluno *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o aluno" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ana">Ana Silva</SelectItem>
                          <SelectItem value="pedro">Pedro Santos</SelectItem>
                          <SelectItem value="mariana">
                            Mariana Oliveira
                          </SelectItem>
                          <SelectItem value="joao">João Costa</SelectItem>
                          <SelectItem value="carla">Carla Mendes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Ocorrência *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="comportamento">
                            Comportamento
                          </SelectItem>
                          <SelectItem value="atraso">Atraso</SelectItem>
                          <SelectItem value="falta">Falta</SelectItem>
                          <SelectItem value="uniforme">Uniforme</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data *</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora *</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Escola</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-muted/50" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="responsible"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pedagogo/Responsável</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="bg-muted/50" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva a ocorrência em detalhes..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700"
                  disabled={form.formState.isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {form.formState.isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
