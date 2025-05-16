'use client'

import { Button } from '@/components/ui/button'
import { TableRow } from '@/components/ui/table'
import { IdentificationCard, UsersFour } from '@phosphor-icons/react/dist/ssr'
import { Mail, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ProfileCard() {
  const router = useRouter()

  const handleOnOccurrenceDetailsClick = () => {
    router.push('/occurrences/1')
  }

  return (
    <div className="w-full flex gap-8 justify-center">
      <div className="w-full h-full max-w-lg rounded-3xl shadow-lg border border-border">
        <div className="flex flex-col items-center p-6">
          <div className="w-32 h-32 mb-4">
            <img
              alt="Profile picture"
              className="w-full h-full object-cover rounded-full grayscale"
              src="https://i.pravatar.cc/150"
            />
          </div>

          <div className="w-full space-y-3 ">
            <h2 className="text-lg font-medium mb-1">João Teste</h2>
            <div className="flex items-center">
              <IdentificationCard
                size={16}
                className="text-muted-foreground mr-2"
              />
              <p className="text-sm text-muted-foreground">082.143.369-60</p>
            </div>
            <div className="flex items-center">
              <UsersFour size={16} className="text-muted-foreground mr-2" />
              <p className="text-sm text-muted-foreground">3º TDS</p>
            </div>

            <p className="text-muted-foreground mb-4">
              Ultima ocorrência: 07 de Agosto de 2019, 16:54
              <br />
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <p className="text-sm font-medium">Maria Flores</p>
              </div>

              <div className="flex items-center">
                <Phone size={16} className="text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">
                  +55 46 99984-3106
                </p>
              </div>

              <div className="flex items-center">
                <Mail size={16} className="text-muted-foreground mr-2" />
                <p className="text-sm text-muted-foreground">
                  Mariaflores@gmail.com
                </p>
              </div>
            </div>

            <Button className="w-full py-2.5 px-4">Editar</Button>
          </div>
        </div>
      </div>

      <div className="w-full h-full max-w-lg rounded-3xl shadow-lg border border-border">
        <div className="p-4">
          <h3 className="text-lg font-medium mb-4">Lista de Ocorrências</h3>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2 px-4 font-medium">Tipo</th>
                <th className="text-left py-2 px-4 font-medium">Data</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              <TableRow onClick={handleOnOccurrenceDetailsClick}>
                <td className="py-2 px-4">Advertência</td>
                <td className="py-2 px-4">07/08/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>
              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>

              <TableRow>
                <td className="py-2 px-4">Suspensão</td>
                <td className="py-2 px-4">15/05/2019</td>
                <td className="py-2 px-4">
                  <Button variant="outline" size="sm">
                    Detalhes
                  </Button>
                </td>
              </TableRow>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
