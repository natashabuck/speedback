import React, { useState } from 'react'
import { Typography, Rate, Card, Button } from 'antd'
import NetlifyForm from 'react-netlify-form'
import { allRadius } from '../styles'
import { useSessionValue } from '../SessionContext'

const { Text } = Typography

const Stars = () => {
  const { pairTime, people, updateStore } = useSessionValue()
  const [rating, setRating] = useState(null)

  return (
    <NetlifyForm name='rating'>
      {({ loading, error, success }) => {
        if (error || success) updateStore('active', 'Feedback')
        return (
          <div>
            {!loading && !success && (
              <div>
                <Card
                  style={{ marginBottom: 30 }}
                  bodyStyle={{ textAlign: 'center' }}
                >
                  <Text strong>Rate this session</Text>
                  <Rate
                    style={{ width: '100%' }}
                    onChange={val => setRating(val)}
                  />
                </Card>
                <input
                  type='text'
                  name='stars'
                  defaultValue={rating | ''}
                  style={{ display: 'none' }}
                />
                <input
                  type='text'
                  name='participants'
                  defaultValue={people.length}
                  style={{ display: 'none' }}
                />
                <input
                  type='text'
                  name='pair-time'
                  defaultValue={pairTime}
                  style={{ display: 'none' }}
                />

                <section style={{ height: 40 }}>
                  {rating ? (
                    <Button
                      htmlType='submit'
                      size='large'
                      type='primary'
                      loading={loading}
                      block
                      style={{
                        borderRadius: allRadius,
                        height: 50
                      }}
                    >
                      Submit Feedback
                    </Button>
                  ) : null}
                </section>
              </div>
            )}
          </div>
        )
      }}
    </NetlifyForm>
  )
}

export default Stars
