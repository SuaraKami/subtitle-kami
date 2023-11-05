import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip'

export const ShortcutTooltip = ({
  children,
  shortcut,
}: {
  children: React.ReactNode
  shortcut: string
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          Shortcut:{'  '}
          <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono text-gray-800 dark:text-gray-300">
            {shortcut}
          </kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
