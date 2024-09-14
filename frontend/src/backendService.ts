import {OpenBrowser} from '@backend'


export function openBrowser(url: string): Promise<void> | never{
 return OpenBrowser(url)
}