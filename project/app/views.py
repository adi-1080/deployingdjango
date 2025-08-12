#payments/views.py

from django.shortcuts import render
from django.http import JsonResponse
from datetime import datetime

def index(request):
    # Debug: Print request details
    print(f"Request method: {request.method}")
    print(f"Request path: {request.path}")
    print(f"GET parameters: {request.GET}")
    
    # Get booking parameters from URL
    venue_name = request.GET.get('venue_name', '')
    booking_date = request.GET.get('booking_date', '')
    start_time = request.GET.get('start_time', '')
    end_time = request.GET.get('end_time', '')
    total_hours = request.GET.get('total_hours', '0')
    price_per_hour = request.GET.get('price_per_hour', '50')
    
    # Calculate total amount
    try:
        total_amount = float(total_hours) * float(price_per_hour)
    except (ValueError, TypeError):
        total_amount = 50.0  # Default fallback
    
    print(f"Calculated total amount: {total_amount}")
    
    context = {
        'venue_name': venue_name,
        'booking_date': booking_date,
        'start_time': start_time,
        'end_time': end_time,
        'total_hours': total_hours,
        'total_amount': f"{total_amount:.2f}",
    }
    
    return render(request, 'app/index.html', context)

def booking_success(request):
    return render(request, 'app/booking_success.html')

def booking_cancelled(request):
    return render(request, 'app/booking_cancelled.html')