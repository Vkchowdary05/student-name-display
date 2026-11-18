#!/usr/bin/env python3
"""
Lab Project 14: Student Names Display (CLI / Python Edition)
Stores and displays the names of five students.
"""

STUDENTS = [
    {"id": 1, "name": "Alexander Wright", "roll_no": "DEV-2024-001", "course": "DevOps & Cloud"},
    {"id": 2, "name": "Beatrice Chen",     "roll_no": "DEV-2024-002", "course": "Site Reliability"},
    {"id": 3, "name": "Clara Oswald",     "roll_no": "DEV-2024-003", "course": "CI/CD Engineering"},
    {"id": 4, "name": "David Kumar",      "roll_no": "DEV-2024-004", "course": "Container Security"},
    {"id": 5, "name": "Elena Rostova",    "roll_no": "DEV-2024-005", "course": "Kubernetes Admin"}
]

def display_students():
    print("=" * 65)
    print("      STUDENT DIRECTORY SYSTEM - 5 STORED STUDENTS       ")
    print("=" * 65)
    print(f"{'#':<4} {'NAME':<20} {'ROLL NUMBER':<16} {'COURSE'}")
    print("-" * 65)
    for idx, s in enumerate(STUDENTS, 1):
        print(f"{idx:<4} {s['name']:<20} {s['roll_no']:<16} {s['course']}")
    print("=" * 65)
    print(f"Total Records Stored: {len(STUDENTS)}")

if __name__ == "__main__":
    display_students()
