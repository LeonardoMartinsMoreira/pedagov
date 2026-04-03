'use client'

import { BackButton } from '@/components/back-button'
import { Loading } from '@/components/loading'
import { MultiSelect } from '@/components/multi-select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LIMIT, PAGE } from '@/constants/pagination'
import { useEditOccurrence } from '@/services/mutations/edit-occurrence'
import { useGetAllAttendees } from '@/services/queries/get-all-attendees'
import { useGetAllStudents } from '@/services/queries/get-all-students'
import { useGetAllTeachers } from '@/services/queries/get-all-teachers'
import { useGetOccurrence } from '@/services/queries/get-occurrence'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const editOccurrenceFormSchema = z.object({
  studentsIds: z
    .array(z.string(), { message: 'Selecione ao menos um aluno' })
    .min(1, { message: 'Selecione ao menos um aluno' }),
  attendeesIds: z
    .array(z.string(), { message: 'Selecione ao menos uma pessoa presente' }),
  teacherId: z.string({ message: 'Selecione o professor presente na matéria' }),
  type: z
    .string({ required_error: 'Selecione o tipo da ocorrência' })
    .min(1, 'Selecione um tipo de ocorrência'),
  description: z
    .string({ required_error: 'Descreva com detalhes o acontecimento' })
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
  title: z
    .string({ required_error: 'Descreva brevemente o acontecimento' })
    .min(1, 'Dê um título para a ocorrência'),
})

type EditOccurrenceFormValues = z.infer<typeof editOccurrenceFormSchema>

export function EditOccurrenceForm() {
  const params = useParams<{ id: string }>()
  const occurrenceId = params.id

  const router = useRouter()

  const { data: occurrence, isLoading: isLoadingOccurrence } = useGetOccurrence(occurrenceId)

  const { data: attendees, isLoading: isLoadingAttendees } = useGetAllAttendees({
    limit: LIMIT,
    page: PAGE,
  })

  const { data: teachers, isLoading: isLoadingTeachers } = useGetAllTeachers({
    limit: LIMIT,
    page: PAGE,
  })

  const { data: studentsData, isLoading: isLoadingStudents } = useGetAllStudents({
    page: PAGE,
    limit: LIMIT,
  })

  const form = useForm<EditOccurrenceFormValues>({
    resolver: zodResolver(editOccurrenceFormSchema),
    values: occurrence
      ? {
          studentsIds: occurrence.students.map((s) => s.id),
          attendeesIds: occurrence.attendees.map((a) => a.id),
          type: occurrence.type,
          description: occurrence.description,
          title: occurrence.title,
          teacherId: occurrence.teacherId,
        }
      : {
          studentsIds: [],
          attendeesIds: [],
          type: '',
          description: '',
          title: '',
          teacherId: '',
        },
  })

  const { mutate, isPending } = useEditOccurrence(router)

  const onSubmit = async (data: EditOccurrenceFormValues) => {
    try {
      mutate({
        ...data,
        occurrenceId,
        attachmentsIds: occurrence?.attachments?.map(a => a.id) || [],
      })
    } catch {}
  }

  const isLoading = isLoadingOccurrence || isLoadingAttendees || isLoadingStudents || isLoadingTeachers

  const { description, studentsIds, type, title, attendeesIds, teacherId } = form.formState.errors

  if (isLoading || !studentsData || !attendees || !teachers || !occurrence) return <Loading />

  return (
    <div className="container max-w-4xl py-8">
      <Card className="border-none">
        <CardHeader className="rounded-t-lg">
          <BackButton />
          <CardTitle className="text-3xl font-bold">Editar Ocorrência</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Título da ocorrência"
                          error={Boolean(title)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentsIds"
                  render={({ field }) => (
                    <FormItem className="mt-1.5">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col gap-y-3">
                          <FormLabel>Aluno(s)</FormLabel>
                          <MultiSelect
                            className="min-h-9"
                            options={studentsData.students.map(({ student, studentId }) => ({
                              label: student,
                              value: String(studentId),
                            }))}
                            defaultValue={field.value}
                            onValueChange={(val) =>
                              form.setValue(field.name, val, {
                                shouldValidate: true,
                              })
                            }
                            selectAll={false}
                            error={Boolean(studentsIds)}
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
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger error={Boolean(type)}>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DISCIPLINE">
                            Comportamento
                          </SelectItem>
                          <SelectItem value="TARDINESS">Atraso</SelectItem>
                          <SelectItem value="ABSENCES">Falta</SelectItem>
                          <SelectItem value="UNIFORM">Uniforme</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="attendeesIds"
                  render={({ field }) => (
                    <FormItem className="mt-1.5">
                      <div className="flex flex-col gap-y-2">
                        <div className="flex flex-col gap-y-3">
                          <FormLabel>
                            Presente(s) no momento da ocorrência
                          </FormLabel>
                          <MultiSelect
                            className="min-h-9"
                            options={attendees.attendees.map(({ id, name }) => ({
                              label: name,
                              value: id,
                            }))}
                            value={field.value}
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            selectAll={false}
                            error={Boolean(attendeesIds)}
                          />
                        </div>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="teacherId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professor(a) presente</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger error={Boolean(teacherId)}>
                            <SelectValue placeholder="Selecione o professor(a) presente na ocorrência" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {teachers.teachers.map((teacher) => {
                            return (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
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

              <div className="flex justify-end pt-4 border-t">
                <Button type="button" variant="outline" className="mr-4" onClick={() => router.back()}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  {isPending ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
