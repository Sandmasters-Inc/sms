import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import Tooltip from 'tooltip-js'

import './styles.css'

export const ProductionCalendar = () => {

  const [calendarState, setCalendarState] = useState({
    loaded: false,
    left: 0,
    top: 0
  })

  useEffect(() => {
    setCalendarState((calendarState) => {
      return {
        ...calendarState,
        loaded: true
      }
    })

  }, [])

  const { loaded } = calendarState

  return loaded && (
    <div className="App">
      <FullCalendar
        // todo: purchase licence key
        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView='resourceTimelineWeek'
        resourceAreaWidth='20%'
        resourceHeaderContent='Employee'
        slotDuration={{days: 1}}
        weekends={false}
        dayHeaders={false}
        eventTextColor='black'
        slotLabelFormat={{weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
        headerToolbar={{
          left: 'today prev,next',
            center: 'title',
            right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        }}
        views={{
          resourceTimelineWeek: {
            titleFormat: {weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }
          }
        }}
        eventDidMount={(info) => {
          const eventElement = info.el
          const id = `${info.event.id}-tooltip`

          const elem = document.createElement('span')
          elem.innerText = info.event.extendedProps.notes
          elem.classList.add('tooltip')
          elem.setAttribute('id', id)
          
          eventElement.after(elem)
          
          const tooltip = new Tooltip({
            title: info.event.extendedProps.notes,
            placement: 'top',
            trigger: 'hover',
            container: 'body',
            el: document.getElementById(id)
          })

          //** ref: https://stackoverflow.com/questions/6773481/how-to-get-the-mouseevent-coordinates-for-an-element-that-has-css3-transform*/
          eventElement.addEventListener('mouseenter', (e) => {
            const target = e.target
            const rect = e.target.getBoundingClientRect()
            const x = e.clientX - rect.left - target.clientLeft + target.scrollLeft + 20
            const y = e.clientY - rect.top - target.clientTop + target.scrollTop
            
            tooltip.el.style.left = `${x}px`
            tooltip.el.style.top = `${y}px`
            tooltip.show()
          })
          eventElement.addEventListener('mouseleave', (e) => {
            tooltip.hide()
          })

        }}
        resources={[
          { id: 'bob', title: 'Bob' },
          { id: 'sue', title: 'Sue' },
          { id: 'mike', title: 'Mike' },
          { id: 'mark', title: 'Mark' }
        ]}
        events={[
          {
            id: 'job-1',
            resourceId: 'bob',
            title: 'job 1',
            start: '2020-07-13',
            end: '2020-07-15',
            notes: 'job 1 - Initial estimate complete.',
            color: 'salmon'
          },
          {
            id: 'job-2',
            resourceId: 'bob',
            title: 'job 2',
            start: '2020-07-15',
            end: '2020-07-15',
            notes: 'job 2 - Initial estimate complete.',
            color: 'yellow'
          },
          {
            id: 'job-3',
            resourceId: 'bob',
            title: 'job 3',
            start: '2020-07-15',
            end: '2020-07-15',
            notes: 'job 3 - Initial estimate complete.',
            color: 'yellow'
          },
          {
            id: 'job-4',
            resourceId: 'bob',
            title: 'job 4',
            start: '2020-07-16',
            end: '2020-07-16',
            notes: 'job 4 - Initial estimate complete.',
            color: 'lightgreen'
          },
          {
            id: 'job-5',
            resourceId: 'bob',
            title: 'job 5',
            start: '2020-07-17',
            end: '2020-07-17',
            notes: 'job 5 - Initial estimate complete.',
            color: 'lightblue'
          },
          {
            id: 'job-6',
            resourceId: 'sue',
            title: 'job 6',
            start: '2020-07-13',
            end: '2020-07-18',
            notes: 'job 6 - Initial estimate complete.',
            color: 'salmon'
          }
        ]}
      />
    </div>
  )
}
