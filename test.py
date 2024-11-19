import requests

while True:

    user_response = input('Would you like to view the top 50 tracks or ' +
                          'artists? Enter your answer: ')

    try:
        if user_response == 'tracks':
            url = 'http://localhost:3001/top-tracks-global'

        elif user_response == 'artists':
            url = 'http://localhost:3001/top-artists-global'

        else:
            print('Wrong response entered')
            continue

        response = requests.get(url)

        if response.status_code == 200:
            print("Response data:")
            print(response.json())

        else:
            print(f"Request failed with status code {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"Error occurred: {e}")
