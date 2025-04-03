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
import { MultiSelect } from '@/components/multi-select'
import { students1000 } from '@/faker/students'

const occurrenceFormSchema = z.object({
  student: z.array(z.string(), { message: 'Selecione ao menos um aluno' }),
  type: z
    .string({ required_error: 'Selecione o tipo da ocorrência' })
    .min(1, 'Selecione um tipo de ocorrência'),
  description: z
    .string({ required_error: 'Descreva com detalhes o acontecimento' })
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  date: z
    .string({ required_error: 'Selecione uma data' })
    .min(1, 'Selecione uma data'),
  time: z
    .string({ required_error: 'Selecione um horário' })
    .min(1, 'Selecione um horário'),
  teacher: z.string(),
  subject: z.string(),
})

type OccurrenceFormValues = z.infer<typeof occurrenceFormSchema>

export default function NewOccurrencePage() {
  const form = useForm<OccurrenceFormValues>({
    resolver: zodResolver(occurrenceFormSchema),
  })

  const onSubmit = async (data: OccurrenceFormValues) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Dados da ocorrência:', data)

      window.location.href = '/'
    } catch (error) {
      console.error('Erro ao salvar ocorrência:', error)
    }
  }

  const { date, description, student, subject, teacher, time, type } =
    form.formState.errors

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

      <Card className="border-none">
        <CardHeader className="rounded-t-lg">
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
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col gap-y-3">
                          <FormLabel>Aluno(s)</FormLabel>
                          <MultiSelect
                            className="h-4"
                            options={students1000.map(({ id, nome }) => {
                              return {
                                label: nome,
                                value: id.toString(),
                              }
                            })}
                            onValueChange={field.onChange}
                            value={field.value}
                            selectAll={false}
                            error={Boolean(student)}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo de Ocorrência</FormLabel>
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
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input error={Boolean(date)} type="date" {...field} />
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
                      <FormLabel>Hora</FormLabel>
                      <FormControl>
                        <Input error={Boolean(time)} type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacher"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professor</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Professor representante da sala de aula"
                          error={Boolean(teacher)}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matéria do acontecimento</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Máteria"
                          error={Boolean(subject)}
                          {...field}
                        />
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
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        error={Boolean(description)}
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
