import { Conversation } from '@tencentcloud/chat'

export enum IGender {
  'male' = 1,
  'female' = 2,
}

export enum IUploadDir {
  'upload' = 'upload',
  'articles' = 'articles',
}

export enum IStoreTypes {
  token = 'token',
  user = 'user',
  currentMessage = 'currentMessage',
  SVG_CACHE = 'SVG_CACHE',
}

export const genderMap = {
  1: '男',
  2: '女',
}

export enum IImageMode {
  widthFix = 'widthFix',
  aspectFill = 'aspectFill',
}

export enum IMessageType {
  'text' = 'text',
  'image' = 'image',
  'video' = 'video',
  'audio' = 'audio',
}

export interface IConversation extends Conversation {
  matchSuccess: boolean
  isSuperLike: boolean
  distance: string
  isOnline: boolean
  followed: boolean
  age: number
  address: string
  onlineHistory: string
  gender: IGender
  isVip: boolean
}

export enum IRealStatus {
  none = '',
  success = 1,
  fail = 0,
}

export enum IRealCheckStatus {
  none = 0,
  ing = 100,
  resolve = 200,
  reject = 300,
}
