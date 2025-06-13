import { DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Description } from '@/types/markers'
import clsx from 'clsx'

export const CustomDrawerContents = ({ data }: { data: Description }) => {
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>{data.markerId}</DrawerTitle>
        <div className={clsx('flex justify-center gap-8')}>
          <p>項目名: {data.name}</p>
          <p>型: {data.type}</p>
        </div>
        <div className={clsx('flex flex-col gap-12')}>
          <div>
            <p>表示データ</p>
            <Input defaultValue={data.displayData} />
          </div>
          <div>
            <p>イベント</p>
            <Textarea defaultValue={data.displayEvent} />
          </div>
          <div>
            <p>備考</p>
            <Textarea defaultValue={data.note} />
          </div>
        </div>
      </DrawerHeader>
    </DrawerContent>
  )
}
