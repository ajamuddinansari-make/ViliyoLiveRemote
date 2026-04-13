import { Dimensions } from 'react-native'

export const wp = (percent: number): number => {
  const width = Dimensions.get('window').width
  return (width * percent) / 100
}

export const hp = (percent: number): number => {
  const height = Dimensions.get('window').height
  return (height * percent) / 100
}