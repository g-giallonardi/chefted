import {pantry} from '@/assets/mock/pantry.js'
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
export default function Pantry(){

    return (
        <div>
            <h2 className='text-2xl font-bold m-5 self-start'>Mon garde-manger</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-lg font-bold'>Ingrédients</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pantry.map((ingredient, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{ingredient}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    );
}