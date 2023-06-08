import React, { CSSProperties } from 'react'
import useLocale from '@/hooks/useLocale'
import { Descriptions, Card, Skeleton } from 'antd'
import locales from './locale'

interface ProfileItemProps {
  title: string
  data: any
  style?: CSSProperties
  type: 'origin' | 'current'
  loading?: boolean
}

function ProfileItem(props: ProfileItemProps) {
  const locale = useLocale(locales)
  const { data, type, loading } = props
  const blockDataList: {
    title: string
    data: {
      label: string
      value: string
    }[]
  }[] = []

  blockDataList.push({
    title: locale[`basicProfile.title.${type}Video`],
    data: [
      {
        label: locale['basicProfile.label.video.mode'],
        value: data?.video?.mode || '-',
      },
      {
        label: locale['basicProfile.label.video.acquisition.resolution'],
        value: data?.video?.acquisition.resolution || '-',
      },
      {
        label: locale['basicProfile.label.video.acquisition.frameRate'],
        value: `${data?.video?.acquisition.frameRate || '-'} fps`,
      },
      {
        label: locale['basicProfile.label.video.encoding.resolution'],
        value: data?.video?.encoding.resolution || '-',
      },
      {
        label: locale['basicProfile.label.video.encoding.rate.min'],
        value: `${data?.video?.encoding.rate.min || '-'} bps`,
      },
      {
        label: locale['basicProfile.label.video.encoding.rate.max'],
        value: `${data?.video?.encoding.rate.max || '-'} bps`,
      },
      {
        label: locale['basicProfile.label.video.encoding.rate.default'],
        value: `${data?.video?.encoding.rate.default || '-'} bps`,
      },
      {
        label: locale['basicProfile.label.video.encoding.frameRate'],
        value: `${data?.video?.encoding.frameRate || '-'} fpx`,
      },
      {
        label: locale['basicProfile.label.video.encoding.profile'],
        value: data?.video?.encoding.profile || '-',
      },
    ],
  })

  blockDataList.push({
    title: locale[`basicProfile.title.${type}Audio`],
    data: [
      {
        label: locale['basicProfile.label.audio.mode'],
        value: data?.audio?.mode || '-',
      },
      {
        label: locale['basicProfile.label.audio.acquisition.channels'],
        value: `${data?.audio?.acquisition.channels || '-'} ${
          locale['basicProfile.unit.audio.channels']
        }`,
      },
      {
        label: locale['basicProfile.label.audio.encoding.channels'],
        value: `${data?.audio?.encoding.channels || '-'} ${
          locale['basicProfile.unit.audio.channels']
        }`,
      },
      {
        label: locale['basicProfile.label.audio.encoding.rate'],
        value: `${data?.audio?.encoding.rate || '-'} kbps`,
      },
      {
        label: locale['basicProfile.label.audio.encoding.profile'],
        value: data?.audio?.encoding.profile || '-',
      },
    ],
  })

  return (
    <Card>
      <div>
        {blockDataList.map(({ title: blockTitle, data: blockData }, index) => (
          <Descriptions
            key={`${index}`}
            colon
            labelStyle={{ textAlign: 'right', width: 200, paddingRight: 10 }}
            contentStyle={{ width: 400 }}
            title={blockTitle}
            style={index > 0 ? { marginTop: '20px' } : {}}
          >
            {blockData.map((item) => {
              return (
                <Descriptions.Item label={item.label} key={item.label}>
                  {loading ? (
                    <Skeleton
                      paragraph={{ rows: 1, style: { width: '200px' } }}
                      active
                    />
                  ) : (
                    item.value
                  )}
                </Descriptions.Item>
              )
            })}
          </Descriptions>
        ))}
      </div>
    </Card>
  )
}

export default ProfileItem
