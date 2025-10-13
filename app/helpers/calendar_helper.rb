module CalendarHelper
  # Builds calendar data for a given month and user
  def build_calendar_data(month, user)
    start_date = month.beginning_of_month
    end_date = month.end_of_month

    # Get reflections for the month grouped by date
    reflections_by_date = user.reflections
                              .where(created_at: start_date.beginning_of_day..end_date.end_of_day)
                              .group_by { |reflection| reflection.created_at.to_date }

    # Build calendar grid (6 weeks x 7 days)
    calendar = []
    current_date = start_date.beginning_of_week

    6.times do |week|
      week_data = []
      7.times do |day|
        date = current_date + day.days
        has_reflection = reflections_by_date.key?(date)

        week_data << build_day_data(date, has_reflection, month)
      end
      calendar << week_data
      current_date += 1.week
    end

    calendar
  end

  # Builds individual day data for the calendar
  def build_day_data(date, has_reflection, current_month)
    {
      date: date,
      day_number: date.day,
      has_reflection: has_reflection,
      is_current_month: date.month == current_month.month,
      is_today: date == Date.current
    }
  end

  # Generates reflection statistics for a given month and user
  def reflection_stats(month, user)
    reflections_in_month = user.reflections.where(
      created_at: month.beginning_of_month..month.end_of_month
    )

    {
      total_reflections: reflections_in_month.count,
      reflection_days: reflections_in_month.group(:created_at)
                                          .count
                                          .keys
                                          .map { |d| d.to_date }
                                          .uniq
                                          .count
    }
  end

  # Generates month navigation data
  def month_navigation_data(current_month)
    {
      previous_month: current_month - 1.month,
      next_month: current_month + 1.month,
      current_month: current_month,
      month_name: current_month.strftime("%B %Y")
    }
  end
end
